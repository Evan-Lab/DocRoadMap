import React, { useState, useEffect, useCallback, useContext } from "react";
import UserContext from "@/constants/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import request from "@/constants/Request";

export default function Index() {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    if (userCtx.user === null) {
      router.replace("/connexion");
    }
  }, [userCtx.user]);

  return null;
}
