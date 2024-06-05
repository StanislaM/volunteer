"use client";

import Button from "@/components/ui/Button";
import { logout } from "@/lib/features/user/userSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const navigateToProfileInfo = () => {
        router.push("/account");
    };

    const handleLogOut = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <div className="flex cursor-pointer items-center justify-between rounded-[10px] hover:bg-gray-light">
            <div className="flex items-center" onClick={navigateToProfileInfo}>
                <Image
                    alt="avatar"
                    src="/img/no-avatar.png"
                    width={59}
                    height={59}
                />

                <span className="ml-2 text-[20px] font-medium text-gray-dark">
                    {user && `${user.firstName || ""} ${user.lastName || ""}`}
                </span>
            </div>

            <Button
                variant="accent"
                fontStyle="semibold"
                onClick={handleLogOut}
            >
                Вихід
            </Button>
        </div>
    );
};

export default Profile;
