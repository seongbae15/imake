ALTER TABLE "messages" DROP CONSTRAINT "messages_message_id_message_rooms_message_room_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" ADD PRIMARY KEY ("message_id");--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "message_id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "messages_message_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "message_room_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_message_room_id_message_rooms_message_room_id_fk" FOREIGN KEY ("message_room_id") REFERENCES "public"."message_rooms"("message_room_id") ON DELETE cascade ON UPDATE no action;