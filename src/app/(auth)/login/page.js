
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import LoginForm from "@/components/auth/LoginForm"


export default function Page() {
    return (
      <div className="flex min-h-screen">
        {/* Left Panel with Image */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/pat.svg')" }}>
          
        </div>
  
        {/* Right Panel with Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-3xl font-semibold mb-6">Sign In to your Account</h2>

          {/* <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an User-Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="OCA-User">OCA</SelectItem>
                <SelectItem value="Club-Member">Club Member</SelectItem>

                </SelectGroup>
            </SelectContent>
            </Select> */}
  
          <LoginForm />
  
          <div className="flex items-center my-4">
            <span className="flex-grow border-t border-gray-600"></span>
            <span className="px-4 text-gray-500">OR CONTINUE WITH</span>
            <span className="flex-grow border-t border-gray-600"></span>
          </div>
  
          <Button>
            <img src="/images/google.png" alt="Google" className="w-5 h-5 mr-2" />
            Sing In with Google
          </Button>
  
          <p className="mt-8 text-gray-500 text-sm">
            By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    );
  }
