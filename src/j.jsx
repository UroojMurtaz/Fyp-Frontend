const sendImg = (d) => {

    fetch('https://api.cloudinary.com/v1_1/dhmolukeg/image/upload', {
        body: JSON.stringify(d),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(async r => {
        let data = await r.json()
        console.log("url", data.public_id)
        seturl(data.url)
        console.log("url", data.url)
        const image = {
            publicId: data.public_id,
            imageUrl: data.url
        }
        // console.log(image)
        axios
            .post(`${baseURL}skin/postimg`, {
                publicId: data.public_id,
                imageUrl: data.url
            }
            )
            .then((res) => {
                //  console.log(res)
            }
            )
            .catch((err) => {
                console.log("error", err);
            });

        return data.pun
    }).catch(err => console.log("error", err))


        }