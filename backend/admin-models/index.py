import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Admin CRUD operations for models (Create, Update, Delete)
    Args: event with httpMethod, body, headers (X-Admin-Token)
    Returns: HTTP response with operation result
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    admin_token = headers.get('X-Admin-Token') or headers.get('x-admin-token', '')
    
    if not admin_token or not admin_token.startswith('admin_'):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', '').replace("'", "''")
        category = body_data.get('category', '')
        image_url = body_data.get('imageUrl', '').replace("'", "''")
        height = body_data.get('height', 0)
        measurements = body_data.get('measurements', '').replace("'", "''")
        experience_years = body_data.get('experienceYears', 0)
        price_per_hour = body_data.get('pricePerHour', 0)
        description = body_data.get('description', '').replace("'", "''")
        
        if not all([name, category, image_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        query = f"""
        INSERT INTO models (name, category, image_url, height, measurements, experience_years, price_per_hour, description)
        VALUES ('{name}', '{category}', '{image_url}', {height}, '{measurements}', {experience_years}, {price_per_hour}, '{description}')
        RETURNING id
        """
        cur.execute(query)
        model_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'modelId': model_id, 'message': 'Модель создана'})
        }
    
    elif method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        model_id = body_data.get('id')
        
        if not model_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Model ID required'})
            }
        
        name = body_data.get('name', '').replace("'", "''")
        category = body_data.get('category', '')
        image_url = body_data.get('imageUrl', '').replace("'", "''")
        height = body_data.get('height', 0)
        measurements = body_data.get('measurements', '').replace("'", "''")
        experience_years = body_data.get('experienceYears', 0)
        price_per_hour = body_data.get('pricePerHour', 0)
        description = body_data.get('description', '').replace("'", "''")
        is_available = body_data.get('isAvailable', True)
        
        query = f"""
        UPDATE models 
        SET name = '{name}', 
            category = '{category}', 
            image_url = '{image_url}', 
            height = {height}, 
            measurements = '{measurements}', 
            experience_years = {experience_years}, 
            price_per_hour = {price_per_hour}, 
            description = '{description}',
            is_available = {is_available}
        WHERE id = {model_id}
        """
        cur.execute(query)
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Модель обновлена'})
        }
    
    elif method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        model_id = params.get('id')
        
        if not model_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Model ID required'})
            }
        
        query = f"UPDATE models SET is_available = false WHERE id = {model_id}"
        cur.execute(query)
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Модель скрыта'})
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
