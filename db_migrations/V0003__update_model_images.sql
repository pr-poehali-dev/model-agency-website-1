UPDATE t_p64992478_model_agency_website.models 
SET image_url = CASE id
  WHEN 2 THEN 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80'
  WHEN 4 THEN 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80'
  WHEN 5 THEN 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'
  WHEN 6 THEN 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&q=80'
  WHEN 7 THEN 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'
  ELSE image_url
END
WHERE id IN (2, 4, 5, 6, 7);