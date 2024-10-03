import axios from '$lib/utils/axios';


class SampleAPI {

    async getSomeProtectedData(
        ) {

        const endpoint = `/sample-protected-endpoint`;
        try {
            const res = await axios({
                url: endpoint,
                method: 'GET',
           })
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            console.error(err);
            //TODO
        }
    }
}
export default new SampleAPI()