"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import { SOCIAL_LINKS, PROJECT_TITLE } from "~/lib/constants";

function LinkCard({ title, url, description, onOpen }: { 
  title: string; 
  url: string; 
  description: string; 
  onOpen: (url: string) => void;
}) {
  return (
    <Card className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
      <CardHeader className="py-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 pb-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onOpen(url)}
        >
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Frame() {
  const { isSDKLoaded, sdk } = useFrameSDK();
  const [currentPage, setCurrentPage] = useState(0);
  const linksPerPage = 3;
  const totalPages = Math.ceil(SOCIAL_LINKS.length / linksPerPage);

  const handleOpenUrl = (url: string) => {
    if (sdk) {
      sdk.actions.openUrl(url);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const currentLinks = SOCIAL_LINKS.slice(
    currentPage * linksPerPage,
    (currentPage + 1) * linksPerPage
  );

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      <Card className="border-2 border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-center">{PROJECT_TITLE}</CardTitle>
          <CardDescription className="text-center text-xs">
            Page {currentPage + 1} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentLinks.map((link, index) => (
            <LinkCard
              key={index}
              title={link.title}
              url={link.url}
              description={link.description}
              onOpen={handleOpenUrl}
            />
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={totalPages <= 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={totalPages <= 1}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
