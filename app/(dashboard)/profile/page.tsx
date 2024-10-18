"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { Badge } from "@/components/ui/badge";
import { Activity, Code } from "lucide-react";
import moment from "moment";
import ProfileTabs from "@/components/global/profile-tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

const fetchProfile = async (userId?: string): Promise<ProfileData | null> => {
  try {
    const response = await fetch(`/api/getUserProfile/${userId}`); // Use relative path
    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error fetching profile data:", error); // Log the error for debugging
    return null;
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null); // Define state with User type
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const loadUserProfile = async () => {
      const response = await fetch("/api/getCurrentUser");
      const currentUserData = await response.json(); // Set user state
      setUser(currentUserData);
      if (currentUserData?.id) {
        const profile = await fetchProfile(currentUserData.id); // Fetch profile data
        setProfileData(profile); // Set profile data state
      }

      setLoading(false); // Update loading state
    };
    loadUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24">
                <Skeleton className="w-full h-full rounded-full" />
              </div>
              <div className="space-y-2 pt-2 text-center md:text-left">
                <Skeleton className="w-40 h-5 pt-5" />
                <div className="h-1"></div>
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <AvatarImage src={user.image} alt={`${user.name}'s Profile`} />
              <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">
                @{user.email.split("@")[0]}
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
                {/* TODO: Add rank badge if necessary */}
                {/* <Badge variant="outline">
                                    <Trophy className="w-4 h-4 mr-1" />
                                    Rank #1
                                </Badge> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProfileTabs profileData={profileData} userDetails={user} />
    </div>
  );
}
