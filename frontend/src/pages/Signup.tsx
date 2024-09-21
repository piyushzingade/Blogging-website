import { Auth } from "../componenets/Auth"
import { Quote } from "../componenets/Quote"

export const Signup = ()=>{
    return (
      <div className="grid grid-cols-2">
        <div className="">
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    );
} 