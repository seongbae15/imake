create or replace view messages_view as
select m1.message_room_id, profiles.name,
  (
    select content
    from messages
    where message_room_id = m1.message_room_id
    order by message_id desc
    limit 1
  ) as last_messagem,
  m1.profile_id as profile_id,
  m2.profile_id as other_profile_id,
  profiles.avatar
from message_room_members m1
inner join message_room_members m2 on m1.message_room_id = m2.message_room_id
inner join profiles on profiles.profile_id = m2.profile_id;