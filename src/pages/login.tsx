import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div className="flex justify-center items-center max-w-screen-sm mx-auto h-screen">
      <div className="card bg-base-100 shadow-xl p-10 h-fit w-full">
        <h2 className="card-title mb-6">Authenticate to Travel Planner</h2>
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_URL}
          supabaseClient={supabaseClient}
          providers={["google"]}
          appearance={{
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
              },
            },
            className: {
              button: "uppercase font-semibold btn btn-primary",
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
