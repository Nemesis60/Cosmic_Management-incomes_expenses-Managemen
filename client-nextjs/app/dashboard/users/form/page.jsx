import Layout from "@/components/Layout";
import UserForm from "../../userForm";

export default function page () {
    return (
        <div>
            <Layout>
                <div className="form-container">
                    <UserForm />
                </div>
            </Layout>
        </div>
    )
}