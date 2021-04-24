import assert from 'assert';

import { Student } from '../schema/students';

describe('Update test', () => {
	const NAME = 'updater';

	beforeEach((done) => {
		const user = new Student({ name: NAME });

		user.save().then(() => {
			done();
		});
	});

	it('update from students collection', (done) => {
		Student.findOneAndUpdate({ name: NAME }, { name: 'updated' })
			.then((student) => Student.findOne({ name: student?.name }))
			.then((stu) => {
				assert(stu?.name !== NAME);
				done();
			});
	});
});
