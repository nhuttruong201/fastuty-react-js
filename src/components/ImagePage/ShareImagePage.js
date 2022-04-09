import axios from "../../configs/axios";
import { useEffect, useState } from "react";

const ShareImagePage = () => {
    const [images, setImages] = useState([]);
    const [msg, setMsg] = useState(null);
    console.log(images);

    const fetchData = async (imageCode) => {
        let res = await axios.get(`/api/collection/${imageCode}`);

        if (!res.data.collection.isShared) {
            setMsg("Chế độ chia sẻ đang tắt!");
            return;
        }

        let images = res.data.data;
        setImages(images);

        console.log("res data from fetchData ShareImagePage: ", res);
    };

    useEffect(() => {
        fetchData("test");
    }, []);

    return (
        <>
            {msg && <h5 className={"text-center mt-5 text-danger"}>{msg}</h5>}

            {!msg && (
                <h5 className={"text-center mt-5 text-success"}>
                    Được chia sẻ với bạn.
                </h5>
            )}

            <div className="project-wrapper mt-5">
                {images &&
                    images.map((item, index) => (
                        <figure key={index} className="mix work-item">
                            <img src={item.url} alt="" />
                            <figcaption className="overlay">
                                <span
                                    className="fancybox"
                                    rel="works"
                                    title={item.title}
                                    href={item.url}
                                    data-fancybox
                                >
                                    <i className="fas fa-eye" />
                                </span>

                                <h4>{item.title}</h4>
                            </figcaption>
                        </figure>
                    ))}
            </div>
        </>
    );
};

export default ShareImagePage;
