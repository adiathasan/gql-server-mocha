import assert from 'assert';

import { Student } from '../schema/students';

describe('Delete test', () => {
	let _id: string;

	const NAME = 'deleter';

	beforeEach((done) => {
		const user = new Student({ name: NAME });

		user.save().then((data) => {
			_id = data._id.toString();
			done();
		});
	});

	it('delete from students collection', (done) => {
		Student.findByIdAndDelete(_id)
			.then((student) => Student.findById(student?._id))
			.then((student) => {
				assert(student === null);
				done();
			});
	});
});
