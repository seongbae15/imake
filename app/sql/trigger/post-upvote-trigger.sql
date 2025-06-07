create function public.handle_post_upvote()
returns trigger
language plpgsql
security DEFINER
set search_path = ''
as $$
begin
    update public.posts set upvotes = upvotes + 1 where post_id = NEW.post_id;
    return new;
end;
$$;

create trigger post_upvote_trigger
after insert on public.post_upvotes
for each row execute procedure public.handle_post_upvote();

create function public.handle_post_unvote()
returns trigger
language plpgsql
security DEFINER
set search_path = ''
as $$
begin
    update public.posts set upvotes = upvotes - 1 where post_id = OLD.post_id;
    return OLD;
end;
$$;

create trigger post_unvote_trigger
after delete on public.post_upvotes
for each row execute procedure public.handle_post_unvote();
