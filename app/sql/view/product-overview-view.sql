create or replace view product_overview_view as 
select
    product_id,
    name,
    tagline,
    description,
    how_it_works,
    icon,
    url,
    stats->>'upvotes' as upvotes,
    stats->>'views' as views,
    stats->>'reviews' as reviews,
    AVG(product_reviews.rating) as average_rating,
from public.products
left join public.reviews as product_reviews using (product_id)
group by product_id;