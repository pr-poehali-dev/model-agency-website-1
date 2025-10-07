import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get models catalog with optional category filter
    Args: event with httpMethod, queryStringParameters (category)
    Returns: HTTP response with models list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    params = event.get('queryStringParameters') or {}
    category = params.get('category', '')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if category and category in ['basic', 'premium', 'luxury']:
        query = f"SELECT id, name, category, image_url, height, measurements, experience_years, price_per_hour, description, is_available FROM t_p64992478_model_agency_website.models WHERE category = '{category}' AND is_available = true ORDER BY price_per_hour DESC"
    else:
        query = "SELECT id, name, category, image_url, height, measurements, experience_years, price_per_hour, description, is_available FROM t_p64992478_model_agency_website.models WHERE is_available = true ORDER BY price_per_hour DESC"
    
    cur.execute(query)
    rows = cur.fetchall()
    
    models = []
    for row in rows:
        models.append({
            'id': row[0],
            'name': row[1],
            'category': row[2],
            'imageUrl': row[3],
            'height': row[4],
            'measurements': row[5],
            'experienceYears': row[6],
            'pricePerHour': float(row[7]),
            'description': row[8],
            'isAvailable': row[9]
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'models': models})
    }