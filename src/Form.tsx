import React, {useState} from "react";
import './Form.css';

function Form() {

    const [error, setError] = useState(false);
    const [shortUrl, setShortUrl] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());

        fetch('https://shorten.aircodr.workers.dev/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('')
                }

                setError(false);
                return response.json();
            })
            .then((data) => {
                setShortUrl(data.url);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                (document.getElementById('form') as HTMLFormElement).reset();
            });
    }

    return (
        <>
            <form id="form" onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="url" placeholder="https://www.google.com" />
                </label>
                <input type="submit" value="Short it!"/>
            </form>
            { shortUrl &&
                <div className="message">
                    <p>Your new shortened URL is:</p>
                    <p>{shortUrl}</p>
                </div>
            }
            { error &&
                <p>An error occurred. Please try again later.</p>
            }
        </>
    )
}

export default Form;