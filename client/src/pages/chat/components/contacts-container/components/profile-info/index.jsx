import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
    const { userInfo,setUserInfo } = useAppStore();
    const navigate = useNavigate();

    const logOut = async () => {
        try{
            const response = await apiClient.post(LOGOUT_ROUTE, {}, {withCredentials:true});
            if(response.status === 200){
                navigate('/auth');
                setUserInfo(null);
            }
        }catch(error){
            console.log(error);
        }
    };

    return (
        <div className="absolute bottom-0 w-full h-16 flex items-center justify-between px-10 bg-[#2a2b33]">
            <div className="flex items-center gap-3 justify-center">
                <div>
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {userInfo.image ? (
                            <AvatarImage 
                                src={`${import.meta.env.VITE_HOST}/${userInfo.image}`}
                                alt="profile" 
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className={`uppercase text-xl flex items-center justify-center w-full h-full ${getColor(userInfo.color || 0)}`}>
                                {userInfo.firstName?.charAt(0) || userInfo.email?.charAt(0)}
                            </div>
                        )}
                    </Avatar>
                </div>
                <div className="text-white">
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                    }
                </div>
            </div>
            <div className="flex  gap-5 ">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2 className="text-purple-500 text-xl font-medium" 
                            onClick={() => navigate('/profile')}
                        /> 
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white rounded-lg">
                        Edit Profile
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp className="text-red-500 text-xl font-medium" 
                            onClick={logOut}
                        /> 
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white rounded-lg">
                        Logout
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            </div>
        </div>
    );
};


export default ProfileInfo;