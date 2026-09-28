import * as React from "react";
import GlassCard from "@/components/ui/glass-card";

const GlassCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-zinc-950/60 p-6 md:p-10 backdrop-blur-md border border-white/10 rounded-2xl my-6">
      <GlassCard />
    </div>
  );
};

export { GlassCardDemo as DemoOne };
export default GlassCardDemo;
