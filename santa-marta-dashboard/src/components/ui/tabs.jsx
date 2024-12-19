import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`
      inline-flex h-10 items-center justify-center rounded-md bg-gray-200 p-1
      text-gray-700 dark:bg-gray-800 dark:text-gray-300 ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`
      inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5
      text-sm font-medium transition-all focus:outline-none focus:ring-2
      focus:ring-gray-300 dark:focus:ring-gray-600 disabled:pointer-events-none
      disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900
      dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`
      mt-2 ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-300
      focus:ring-offset-2 dark:ring-offset-gray-900 dark:focus:ring-gray-600 ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
