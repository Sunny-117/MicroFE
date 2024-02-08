import { NOT_MOUNTED, MOUNTING, MOUNTED } from "../applications/app.helpers";

export async function toMountPromise(app){
    if(app.status !== NOT_MOUNTED){
        return app;
    }
    app.status = MOUNTING;
    await app.mount(app.customProps);
    app.status = MOUNTED;
    return app;
}


