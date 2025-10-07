import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create model booking and payment request
    Args: event with httpMethod, body (modelId, clientName, clientEmail, clientPhone, bookingDate, hours)
    Returns: HTTP response with booking confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    model_id = body_data.get('modelId')
    client_name = body_data.get('clientName')
    client_email = body_data.get('clientEmail')
    client_phone = body_data.get('clientPhone', '')
    booking_date = body_data.get('bookingDate')
    hours = body_data.get('hours')
    notes = body_data.get('notes', '')
    
    if not all([model_id, client_name, client_email, booking_date, hours]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    cur.execute(f"SELECT price_per_hour, name FROM models WHERE id = {model_id}")
    result = cur.fetchone()
    
    if not result:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Model not found'})
        }
    
    price_per_hour = float(result[0])
    model_name = result[1]
    total_price = price_per_hour * int(hours)
    
    client_name_escaped = client_name.replace("'", "''")
    client_email_escaped = client_email.replace("'", "''")
    client_phone_escaped = client_phone.replace("'", "''")
    notes_escaped = notes.replace("'", "''")
    
    insert_query = f"""
    INSERT INTO bookings (model_id, client_name, client_email, client_phone, booking_date, hours, total_price, notes, status, payment_status)
    VALUES ({model_id}, '{client_name_escaped}', '{client_email_escaped}', '{client_phone_escaped}', '{booking_date}', {hours}, {total_price}, '{notes_escaped}', 'pending', 'unpaid')
    RETURNING id
    """
    
    cur.execute(insert_query)
    booking_id = cur.fetchone()[0]
    conn.commit()
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'bookingId': booking_id,
            'modelName': model_name,
            'totalPrice': total_price,
            'message': 'Бронирование создано. Мы свяжемся с вами для подтверждения оплаты.'
        })
    }
