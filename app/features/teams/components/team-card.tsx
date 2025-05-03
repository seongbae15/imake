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
  id: string;
  username: string;
  avatarUrl: string;
  avatarFallback: string;
  roles: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  username,
  avatarUrl,
  avatarFallback,
  roles,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center"
            >
              <span>@{username}</span>
              <Avatar className="size-4">
                <AvatarFallback>{avatarFallback}</AvatarFallback>
                <AvatarImage src={avatarUrl} />
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
