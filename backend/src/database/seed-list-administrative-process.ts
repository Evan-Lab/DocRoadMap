import { DataSource } from 'typeorm';
import { ListAdministrativeProcess } from '../list_administrative_process/entities/list_administrative_process.entity';

export const seedListAdministrativeProcess = async (dataSource: DataSource) => {
    const repository = dataSource.getRepository(ListAdministrativeProcess);

    const defaultProcesses = [
        { name: 'Acheter un logement', collection_name: 'jachete_un_logement' },
        { name: 'Je pars de chez mes parents', collection_name: 'je_pars_de_chez_mes_parents' },
        { name: 'Je recherche un emploi', collection_name: 'recherche-emploi' },
        { name: 'Acte de naissance', collection_name: 'acte_naissance' },
        { name: 'Déménagement en France', collection_name: 'demenagement_en_france' },
        { name: "Garde d'enfants", collection_name: 'garde_enfants' },
    ];

    for (const process of defaultProcesses) {
        const exists = await repository.findOne({ where: { name: process.name } });
        if (!exists) {
            await repository.save(process);
        }
    }

    console.log('ListAdministrativeProcess table seeded with default values.');
};