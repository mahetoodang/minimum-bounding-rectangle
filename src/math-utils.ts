import { create, matrixDependencies, multiplyDependencies, transposeDependencies } from 'mathjs';

const { matrix, transpose, multiply } = create({
	matrixDependencies,
	multiplyDependencies,
	transposeDependencies,
});

export { matrix, transpose, multiply };
