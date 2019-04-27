import { Request, Response } from 'express';
import { SearchReultsController } from '../controllers/searchReultsController';
import { MirrorResultController } from '../controllers/mirrorResultController';
import { GetServerConfigController } from '../controllers/getServerConfigController';
import { SetServerConfigController } from '../controllers/setServerConfigController';

export class Routes {
    public routes(app): void {
        app.route('/api/search/:term')
            .get((req: Request, res: Response) => {
                const controller: SearchReultsController = new SearchReultsController(req.params.term);
                controller.getResults().then(values => {
                    res.json({
                        status: 'success',
                        results: values
                    });
                    console.log('Successfully Served Search: ' + req.params.term);
                }).catch(error => {
                    res.json({
                        status: 'error',
                        message: error
                    });
                    console.log(error);
                });
            });
        app.route('/api/magnet/:url/:provider')
            .get((req: Request, res: Response) => {
                const controller: MirrorResultController = new MirrorResultController(req.params.url, req.params.provider);
                controller.getMagnet().then(url => {
                    if (url === '') {
                        res.json({
                            response: 'error',
                            message: 'No Magnet URL Retrieved from Server'
                        });
                        console.log('Magnet Lookup Failed: ' + req.params.url + req.params.provider);
                    } else {
                        res.json({
                            response: 'success',
                            magnetUrl: url
                        });
                        console.log('Successfully Served Magnet Lookup: ' + req.params.url);
                    }
                }).catch(error => {
                    res.json({
                        response: 'error',
                        message: error
                    });
                    console.log(error);
                });
            });
        app.route('/api/getconfig')
            .get((req: Request, res: Response) => {
                GetServerConfigController.getServerConfig().then(config => {
                    res.json( {
                        response: 'success',
                        conf: config
                    });
                }).catch(error => {
                    res.json({
                        response: 'error',
                        message: error
                    });
                });
            });
        app.route('/api/setconfig')
            .post((req: Request, res: Response) => {
                const controller = new SetServerConfigController(req.body);
                res.json({
                   success: controller.setServerConfig(),
                });
            });
    }
}
