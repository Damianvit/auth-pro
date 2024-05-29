import { signIn } from "@/auth";

export function SignInServer({ values }) {
    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                await signIn("credentials", values);
            }}
        >
            <label>
                Email
                <input name="email" type="email" value={values.email} />
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    value={values.password}
                />
            </label>
            <button>Sign In</button>
        </form>
    );
}
