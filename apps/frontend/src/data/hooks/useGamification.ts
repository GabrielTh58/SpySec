import { useContext } from "react";
import { GamificationContext } from "../context/GamificationContext";

export const useGamification = () => useContext(GamificationContext);
