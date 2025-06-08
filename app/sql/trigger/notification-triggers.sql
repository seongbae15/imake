create function public.notify_follow()
returns trigger
security definer set search_path = ''
LANGUAGE plpgsql
as $$
begin
    insert into public.notifications (type, source_id, target_id)
    values ('follow', new.follower_id, new.following_id);
    return new;
end;
$$;

create trigger notify_follow_trigger
after insert on public.follows
for each row
execute procedure public.notify_follow();

create function public.notify_review()
returns trigger
security definer set search_path = ''
LANGUAGE plpgsql
as $$
declare
    product_owner uuid;
begin
    select profile_id into product_owner from public.products where product_id = new.product_id;
    insert into public.notifications (type, source_id, target_id)
    values ('review', new.profile_id, product_owner);
    return new;
end;
$$;

create trigger notify_review_trigger
after insert on public.reviews
for each row
execute procedure public.notify_review();

create function public.notify_reply()
returns trigger
security definer set search_path = ''
LANGUAGE plpgsql
as $$
declare
    post_owner uuid;
begin
    select profile_id into post_owner from public.posts where post_id = new.post_id;
    insert into public.notifications (type, source_id, target_id)
    values ('reply', new.profile_id, post_owner);
    return new;
end;
$$;

create trigger notify_reply_trigger
after insert on public.post_replies
for each row
execute procedure public.notify_reply();