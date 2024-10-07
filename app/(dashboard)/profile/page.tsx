import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Code, Trophy } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";
import ProfileTabs from "@/components/profile-tabs";
import { headers } from "next/headers";

const fetchProfile = async (userId?: string): Promise<ProfileData | null> => {
  try {
    // console.log("USERID", userId)
    const headersList = headers();
    // to get domain
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV == "development" ? "http" : "https";
    const response = await fetch(
      `${protocol}://${host}/api/getUserProfile/${userId}`
    );

    const userData = await response.json();

    return userData;
  } catch (error) {
    return null;
  }
};
export default async function ProfilePage() {
  const user = await currentUser();
  const profileData = await fetchProfile(user?.id);

  if (!user) {
    return (
      <div>
        <h1>LOGIN TO SEE YOUR PROFILE</h1>
      </div>
    );
  }
  if (!profileData) {
    return (
      <div>
        <h1>UNABLE TO FETCH YOUR PROFILE DATA</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user.imageUrl}
                alt={`${user.fullName}'s Profile`}
              />
              <AvatarFallback>{user.fullName?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user.emailAddresses[0].emailAddress
                  .split("@")[0]
                  .toUpperCase()}
              </h1>
              <p className="text-muted-foreground">
                @{user.emailAddresses[0].emailAddress.split("@")[0]}
              </p>
              <p>I am a Pro Codecache User</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="outline">
                  <Activity className="w-4 h-4 mr-1" />
                  Joined {moment(user.createdAt).fromNow()}
                </Badge>
                <Badge variant="outline">
                  <Code className="w-4 h-4 mr-1" />
                  {profileData.contribution} Contributions
                </Badge>
                {/* TODO! TBD */}
                {/* <Badge variant="outline">
                  <Trophy className="w-4 h-4 mr-1" />
                  Rank #1
                </Badge> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProfileTabs profileData={profileData} />
    </div>
  );
}
