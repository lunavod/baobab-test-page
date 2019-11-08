import Baobab from 'baobab'

window.tree = new Baobab({
	counter: 0,
	array: [],
	obj: {
		foo: {bar: "buzz"}
	}
})


console.log('BAOBAB', (new Date()).getSeconds())

document.addEventListener('baobabExtensionReady', () => {
	registerBaobabStore(tree, 'store')
})

function getVal(el) {
	if (!el.value.length) return undefined
	return JSON.parse(el.value)
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#trigger').addEventListener('click', () => {
		tree.select('counter').set(tree.select('counter').get()+1)
	})

	document.querySelector('#set').addEventListener('click', () => {
		tree.select(getVal(document.querySelector('#set_path'))).set(getVal(document.querySelector('#set_value')))
	})

	document.querySelector('#unset').addEventListener('click', () => {
		tree.select(getVal(document.querySelector('#set_path'))).unset(getVal(document.querySelector('#set_value')))
	})

	document.querySelector('#unshift').addEventListener('click', () => {
		tree.select('array').unshift(getVal(document.querySelector('#add')))
	})

	document.querySelector('#push').addEventListener('click', () => {
		tree.select('array').push(getVal(document.querySelector('#add')))
	})

	document.querySelector('#concat').addEventListener('click', () => {
		tree.select('array').concat(getVal(document.querySelector('#concat_val')))
	})

	document.querySelector('#splice').addEventListener('click', () => {
		let args = [getVal(document.querySelector('#index')), getVal(document.querySelector('#deleteNum'))]
		let add = getVal(document.querySelector('#newItems'))
		if (add) args.push(add)
		tree.select('array').splice(args)
	})

	document.querySelector('#merge').addEventListener('click', () => {
		tree.select('obj').merge(getVal(document.querySelector('#merge_val')))
	})

	document.querySelector('#deepMerge').addEventListener('click', () => {
		tree.select('obj').deepMerge(getVal(document.querySelector('#merge_val')))
	})

	document.querySelector('#apply').addEventListener('click', () => {
		console.log(tree.select('array').apply((arr) => arr.map(el=> el+getVal(document.querySelector('#n')))))
	})

	const watcher = tree.watch({counter: ['counter']})
	watcher.on('update', (e) => {
		console.log('UPDATE', watcher.get())
		document.querySelector('#count').innerText = watcher.get().counter
	})
})