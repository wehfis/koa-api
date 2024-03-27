import app from './app';
import common from './config';

app.listen(common.port, async () => {
    console.log(`Server is running on port: ${common.port}`);
});
