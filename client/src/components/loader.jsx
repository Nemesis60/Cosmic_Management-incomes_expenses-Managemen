import ClipLoader from 'react-spinners/ClipLoader'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue"
}

export default function Loader () {

    return (
        <ClipLoader
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        ></ClipLoader>
    )
}