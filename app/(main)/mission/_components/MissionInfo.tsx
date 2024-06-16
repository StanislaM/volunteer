import { IMissionFullInfo } from "@/shared/types";
import React from "react";

type Props = {} & IMissionFullInfo;

const MissionInfo = ({ name }: Props) => {
    return <div>{name}</div>;
};

export default MissionInfo;
