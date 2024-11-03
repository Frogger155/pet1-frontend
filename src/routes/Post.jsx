import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

async function getPost(post_id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/` + post_id, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem("access_token")}`,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw new Error('Failed to fetch post');
    }
}


export async function loader({ params }) {
    try {
        const post = await getPost(params.post_id);
        return post;
    } catch (error) {
        return null;
    }
}
