import type { NextPage } from "next";
import { useEffect } from "react";
import Loading from "../components/ui/Loading";
import { useGetStoresQuery } from "../services/api";

const ConfirmPaymentPage: NextPage = () => {
  useEffect(() => {
    window.parent.postMessage({
      type: "confirmation",
      message: true,
    });
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loading />
    </div>
  );
};

export default ConfirmPaymentPage;
