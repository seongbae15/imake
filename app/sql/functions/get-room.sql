CREATE OR REPLACE FUNCTION public.get_room(from_user_id uuid, to_user_id uuid)
RETURNS TABLE (message_room_id bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY select m1.message_room_id
    from public.message_room_members m1
    inner join public.message_room_members m2
    on m1.message_room_id = m2.message_room_id
    where m1.profile_id = from_user_id
    and m2.profile_id = to_user_id;
END;
$$;