import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import { Layout } from "@/components";

const appearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brandButtonText: "#333c4d",
      },
      fonts: {
        bodyFontFamily: "inherit",
        buttonFontFamily: "inherit",
        labelFontFamily: "inherit",
        inputFontFamily: "inherit",
      },
      radii: {
        inputBorderRadius: "0.5rem",
        borderRadiusButton: "0.5rem",
        buttonBorderRadius: "0.5rem",
      },
    },
  },
  className: {
    button: "uppercase font-semibold btn btn-primary",
  },
};

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <Layout title="Login" description="Login to Travel Planner">
      <div className="flex justify-center items-center max-w-screen-sm mx-auto h-full">
        <div className="card bg-base-100 shadow-xl p-10 h-fit w-full">
          <h2 className="card-title mb-6">Authenticate to Travel Planner</h2>
          <Auth
            redirectTo={process.env.NEXT_PUBLIC_URL}
            supabaseClient={supabaseClient}
            providers={["google"]}
            appearance={appearance}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
