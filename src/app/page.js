import BannerSlider from "@/components/Home/BannerSlider";
import ColdCoffees from "@/components/Home/ColdCoffees";
import HotCoffees from "@/components/Home/HotCoffees";

export default function Home() {
  return (
    <div>
      <BannerSlider/>
      <HotCoffees/>
      <ColdCoffees/>
    </div>
  );
}
