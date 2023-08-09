import {
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import bg1 from "../assets/—Pngtree—cartoon silhouette city buildings_73108.png";
export default function Main() {
  const background = {
    image: "https://wallpapercave.com/wp/wp4782096.jpg",
    // translateY: [0, 50],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline = {
    translateY: [0, 50],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl text-gray-300  font-bold">
          Welcome To Shop.
        </h1>
      </div>
    ),
  };

  const buildings = {
    translateY: [0, 20],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className="h-full w-full -z-20 -bottom-52 left-32 absolute ">
        <img src={bg1} alt="" />
      </div>
    ),
  };

  const clouds = {
    translateX: [0, -50],
    opactity: [1, 0.5],

    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className="h-1/5 w-1/5 top-96 right-32  absolute ">
        <img src="http://clipartmag.com/images/cloud-icon-png-2.png" alt="" />
      </div>
    ),
  };

  const scrollDown = {
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute top-14 left-14">
        <h1 className="text-white tracking-widest font-thin text-xl ">
          Scroll Down
        </h1>
      </div>
    ),
  };

  return (
    <>
      <ParallaxBanner
        layers={[background, clouds, headline, buildings, scrollDown]}
        className="aspect-[2/1]"
      />
    </>
  );
}
