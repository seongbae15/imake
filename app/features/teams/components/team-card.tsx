import { Link } from "react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/components/ui/avatar";

interface TeamCardProps {
  id: number;
  username: string;
  avatarUrl: string | null;
  roles: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  username,
  avatarUrl,
  roles,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className="block">
      <Card className="bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center"
            >
              <span>@{username}</span>
              <Avatar className="size-4">
                <AvatarFallback>{username[0]}</AvatarFallback>
                {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
              </Avatar>
            </Badge>
            <span> is looking for </span>
            {roles.map((role, index) => (
              <Badge key={index} className="text-base">
                {role}
              </Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join Team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
