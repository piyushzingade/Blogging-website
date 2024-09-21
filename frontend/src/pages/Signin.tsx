import { Auth } from "../componenets/Auth";
import { Quote } from "../componenets/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="">
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
