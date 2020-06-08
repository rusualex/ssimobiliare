import { IUser } from './../model/user.model';
export class IdMapper {
    async remapModel(entity: any) {
        const model = entity.toObject();
        model.id = model._id;
        delete model._id;
        delete model.__v;
        return model;
    }

    async remapModels(entitys: any[]) {
        var modelsRemapped: any[] = [];
        entitys.forEach(usr => {
            const modelRemapped = usr.toObject();
            modelRemapped.id = usr.id;
            delete modelRemapped._id;
            delete modelRemapped.__v;
            modelsRemapped.push(modelRemapped);
        });
        return modelsRemapped;
    }
}