import useForm from "../../hooks/useForm"
import useAuth from "../../hooks/useAuth"

export default function ModalExpenseForm({ open, onClose }) {
    const { id } = useAuth()

    let initialData = {
        UserCreator: id,
        outTitle: '',
        outAmount: 0,
        outDescription: ''
    }

    const onValidate = (form) => {
        let errors = {}
        let regexDescription = /^[\s\S]{8,300}$/

        if (!form.outTitle.trim()) {
            errors.outTitle = 'Please fill this input'
        }
        if (!form.outAmount.trim()) {
            errors.outAmount = 'Please fill this input'
        }
        if (!form.outDescription.trim()) {
            errors.outDescription = 'Please fill this input'
        } else if (!regexDescription.test(form.outDescription)) {
            errors.outDescription = 'just 8 to 300 caracteres'
        }

        return errors
    }
    const handleCancel = () => {
        initialData = {
            UserCreator: id,
            outTitle: '',
            outAmount: 0,
            outDescription: ''
        }
        onClose()
    }

    const { form, errors, handleSubmit, handleChange } = useForm(initialData, onValidate, 'expenses',
        'Expense was Created'
    )

    if (!open) return null

    return (
        <div className="overlay" >
            <div className="modal">
                <form className="form" onSubmit={handleSubmit} >
                    <div className="form-input">
                        <label htmlFor="title">Title</label>
                        <input
                            value={form.outTitle}
                            onChange={handleChange}
                            name="outTitle"
                            type="text" id="title" placeholder="Title"
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="amount">Amount</label>
                        <input
                            value={form.outAmount}
                            onChange={handleChange}
                            name="outAmount"
                            type="text" id="amount" placeholder="Amount"
                        />
                    </div>
                    <div className="form-textarea">
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={form.outDescription}
                            onChange={handleChange}
                            name="outDescription"
                            cols="30" rows="10"
                            placeholder="Description"
                        ></textarea>
                        {errors.outDescription && <p className="modal-error" >{errors.outDescription}</p>}
                    </div>
                    <div className="form-btn">
                        <button className="modal-btn" type="submit">Send</button>
                        <button className="modal-btn"
                            onClick={handleCancel}
                        >Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
} 