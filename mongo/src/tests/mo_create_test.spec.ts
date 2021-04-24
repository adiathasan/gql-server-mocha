import assert from 'assert';

import { Student } from '../schema/students';

describe('Create test', () => {
	it('create a user in students collection', () => {
		const student = new Student({ name: 'creater' });

		student
			.save()
			.then(() => {
				const isSaved = !student.isNew;
				assert(isSaved);
			})
			.catch((err) => {
				console.log('catch => ', err);
			});
	});
});
