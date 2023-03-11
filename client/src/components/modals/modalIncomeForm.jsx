import useForm from "../../hooks/useForm"
import useAuth from "../../hooks/useAuth"

export default function ModalIncomeForm({ open, onClose }) {
    const { id } = useAuth()

    let initialData = {
        UserCreator: id,
        inTitle: '',
        inAmount: 0,
        inDescription: ''
    }

    const onValidate = (form) => {
        let errors = {}
        let regexDescription = /^[\s\S]{8,300}$/

        if (!form.inTitle.trim()) {
            errors.inTitle = 'Please fill this input'
        }
        if (!form.inAmount.trim()) {
            errors.inAmount = 'Please fill this input'
        }
        if (!form.inDescription.trim()) {
            errors.inDescription = 'Please fill this input'
        } else if (!regexDescription.test(form.inDescription)) {
            errors.inDescription = 'just 8 to 300 caracteres'
        }

        return errors
    }
    const handleCancel = () => {
        initialData = {
            UserCreator: id,
            inTitle: '',
            inAmount: 0,
            inDescription: ''
        }
        onClose()
    }

    const { form, errors, handleSubmit, handleChange } = useForm(initialData, onValidate, 'incomes',
        'Income was Created'
    )


    if (!open) return null

    return (
        <div className="overlay" >
            <div className="modal">
                <form className="form" onSubmit={handleSubmit} >
                    <div className="form-input">
                        <label htmlFor="title">Title</label>
                        <input
                            value={form.inTitle}
                            onChange={handleChange}
                            name="inTitle"
                            type="text" id="title" placeholder="Title"
                        />
                        {errors.inTitle && <p className="modal-error" >{errors.inTitle}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="amount">Amount</label>
                        <input
                            value={form.inAmount}
                            onChange={handleChange}
                            name="inAmount"
                            type="text" id="amount" placeholder="Amount"
                        />
                        {errors.inAmount && <p className="modal-error" >{errors.inAmount}</p>}
                    </div>
                    <div className="form-textarea">
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={form.inDescription}
                            onChange={handleChange}
                            name="inDescription"
                            id="description" cols="30" rows="10"
                            placeholder="Description"
                        ></textarea>
                        {errors.inDescription && <p className="modal-error" >{errors.inDescription}</p>}
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