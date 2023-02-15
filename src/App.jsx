import { useState } from 'react';
import './App.css';
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

function App() {
    const [openModel, setOpenModal] = useState(false);
    const sigCanvas = useRef();
    const [penColor, setPenColor] = useState('black');
    const [imageURL, setImageURL] = useState(null);
    const [name, setName] = useState('');

    const colors = ['black', 'green', 'red'];

    const create = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setImageURL(URL);
        setOpenModal(false);
    };

    const download = () => {
        const dlink = document.createElement('a');
        dlink.setAttribute('href', imageURL);
        dlink.setAttribute('download', 'signature.png');
        dlink.click();
    };

    const handleShare = () => {
        const message = `dei, ini tanda tangan aku dei: ${name}`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/?text=${encodedMessage}&source=${imageURL}`;
        window.open(url, '_blank');
    };

    return (
        <div className='app'>
            <div className='flex flex-col gap-2 items-center'>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    autoFocus={true}
                    placeholder='Masukkan Nama'
                    required
                />

                <button className='bg-black' onClick={() => setOpenModal(true)}>
                    Buat Tanda Tangan
                </button>
            </div>
            <br />
            {imageURL && (
                <div className='flex flex-col gap-2 items-center'>
                    <img
                        src={imageURL}
                        alt='signature'
                        className='signature mx-auto'
                    />
                    <br />
                    <button
                        onClick={download}
                        style={{ padding: '5px', marginTop: '5px' }}
                    >
                        Download
                    </button>
                    {/* <button
                        onClick={handleShare}
                        style={{
                            padding: '5px',
                            marginTop: '5px',
                            backgroundColor: 'green',
                            color: 'white',
                        }}
                    >
                        Share
                    </button> */}
                </div>
            )}
            {openModel && (
                <div className='modalContainer'>
                    <div className='modal'>
                        <div className='sigPad__penColors'>
                            <p>Pen Color:</p>
                            {colors.map((color) => (
                                <span
                                    key={color}
                                    style={{
                                        backgroundColor: color,
                                        border: `${
                                            color === penColor
                                                ? `2px solid ${color}`
                                                : ''
                                        }`,
                                    }}
                                    onClick={() => setPenColor(color)}
                                ></span>
                            ))}
                        </div>
                        <div className='sigPadContainer'>
                            <SignatureCanvas
                                penColor={penColor}
                                canvasProps={{ className: 'sigCanvas' }}
                                ref={sigCanvas}
                            />
                            <hr />
                            <button onClick={() => sigCanvas.current.clear()}>
                                Clear
                            </button>
                        </div>

                        <div className='modal__bottom'>
                            <button onClick={() => setOpenModal(false)}>
                                Cancel
                            </button>
                            <button className='create' onClick={create}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
