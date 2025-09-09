# This is used by the Github Actions to run the static analysis.

.PHONY: clean install-dev lint type-check format check-code

clean:
	rm -rf .mypy_cache .pytest_cache .ruff_cache build dist htmlcov .coverage

install-dev:
	uv sync --all-extras

lint:
	uv run ruff format --check
	uv run ruff check

# Due to each server having its own "src" directory, running type checking on all server together causes
# the error: "Duplicate module named 'src'". Therefore, type checking must be executed separately for each server.
#type-check:
	#uv run mypy calculator-MCP-server

format:
	uv run ruff check --fix
	uv run ruff format

#check-code: lint type-check
check-code: lint
