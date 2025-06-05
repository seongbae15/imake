create or replace function get_product_stats(product_id text)
returns table (
    product_view bigint,
    product_visit bigint,
    month text
) as $$
begin
    return query
    select
        sum(case when event_type = 'product_view' then 1 else 0 end) as product_view,
        sum(case when event_type = 'product_visit' then 1 else 0 end) as product_visit,
        to_char(events.created_at, 'YYYY-MM') as month
    from public.events
    where event_data ->> 'product_id' = product_id
    group by month;
end;
$$ language plpgsql;

