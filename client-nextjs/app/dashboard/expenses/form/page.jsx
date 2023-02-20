import Layout from "@/components/Layout";
import ExpenseForm from "../../expenseForm";

export default function page () {
    return (
        <div>
            <Layout>
                <div className="form-container">
                    <ExpenseForm />
                </div>
            </Layout>
        </div>
    )
}